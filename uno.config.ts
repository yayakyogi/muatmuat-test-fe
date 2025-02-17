import { defineConfig, presetMini, presetIcons } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
    }),
  ],
});
