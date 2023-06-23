import globalVars from "@/styles/vars.css";
import { style } from "@vanilla-extract/css";

const horizen = style({
  height: 40,
});

const content = style({
  display: "inline-block",
  alignItems: "center",
  whiteSpace: "nowrap",
  width: "auto",
  height: "100%",
});

const listContainer = style({
  display: "flex",
  alignItems: "center",
  padding: "10px 0",
  height: "100%",
  boxSizing: "border-box",
  columnGap: 5,
});

const listItem = style({
  flex: " 0 0 auto",
  fontSize: globalVars.font_size_m,
  borderRadius: "10px",
  padding: "4px 5px",

  ":first-of-type": {
    flex: "0 0 auto",
    padding: "5px 10px",
    color: "gray",
    fontSize: globalVars.font_size_m,
    verticalAlign: "middle",
  },

  selectors: {
    "&.selected": {
      color: globalVars.theme_color,
      border: `1px solid ${globalVars.theme_color}`,
      opacity: 0.8,
    },
  },
});

export { horizen, content, listContainer, listItem };
