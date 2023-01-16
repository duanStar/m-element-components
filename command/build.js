const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const path = require("path");
const fsExtra = require("fs-extra");

const entryDir = path.resolve(__dirname, "../package");

const outDir = path.resolve(__dirname, "../lib");

const baseConfig = defineConfig({
  plugins: [vue(), vueJsx()],
  configFile: false,
  publicDir: false,
});

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

// 打包所有组件
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, "index.ts"),
        name: "index",
        fileName: (format) => `index.${format}.js`,
        formats: ["es", "umd"],
      },
      outDir,
    },
  });
};

// 单独打包组件
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, `${name}/index.ts`),
        name: "index",
        fileName: (format) => `index.${format}.js`,
        formats: ["es", "umd"],
      },
      outDir: path.resolve(outDir, name),
    },
  });
};

const copyToLib = async () => {
  let sourcePath = path.resolve(__dirname, "../static/package.json");
  let targetPath = path.resolve(outDir, "package.json");
  fsExtra.copyFileSync(sourcePath, targetPath);
  sourcePath = path.resolve(__dirname, "../static/index.d.ts");
  targetPath = path.resolve(outDir, "index.d.ts");
  fsExtra.copyFileSync(sourcePath, targetPath);
};

const copySingle = async (name) => {
  let sourcePath = path.resolve(__dirname, "../static/index.d.ts");
  let targetPath = path.resolve(outDir, name, "index.d.ts");
  fsExtra.copyFileSync(sourcePath, targetPath);
};

const createPackageJson = async (name) => {
  const fileStr = `
    {
      "name": "${name}",
      "main": "index.umd.js",
      "module": "index.es.js",
      "style": "style.css",
    }
  `;
  fsExtra.outputFileSync(
    path.resolve(outDir, name, "package.json"),
    fileStr,
    "utf-8"
  );
};

const buildLib = async () => {
  await buildAll();
  await copyToLib();

  const components = fsExtra.readdirSync(entryDir).filter((name) => {
    const componentDir = path.resolve(entryDir, name);
    const isDir = fsExtra.statSync(componentDir).isDirectory();
    return (
      isDir &&
      fsExtra.existsSync(componentDir + "/index.ts") &&
      name !== "hooks" &&
      name !== "utils"
    );
  });
  components.forEach(async (item) => {
    await buildSingle(item);
    await createPackageJson(item);
    await copySingle(item);
  });
};

buildLib();
