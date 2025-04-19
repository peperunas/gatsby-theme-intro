const color = require("color")

module.exports = theme => {
  const colors =
    typeof theme === "string" ? require(`./src/themes/${theme}`) : theme

  return {
    purge: {
      content: [`${__dirname}/src/**/*.js`, `./src/**/*.js`],
      options: {
        safelist: [/^text-skill/, /^border-skill/],
      },
    },
    darkMode: false,
    theme: {
      fontFamily: {
        header: ["Fira Code", "monospace"],
        text: ["Space Mono", "monospace"],
      },
      extend: {
        colors: {
          ...colors,
          "back-light": color(colors.back)
            .lighten(0.18)
            .hex(),
        },
        borderRadius: {
          lg: "1rem",
        },
        spacing: {
          "14": "3.5rem",
        },
      },
    },
  }
}
