export const formatField = (field: any, defaultValue = "Desconocido") => {
  return field ? field : defaultValue;
};

export const formatArrayField = (
  field: { text: string }[],
  defaultValue = "Desconocido"
) => {
  return field && Array.isArray(field)
    ? field
        .map((item) =>
          typeof item === "object" ? item.text || JSON.stringify(item) : item
        )
        .join(", ")
    : defaultValue;
};

export const formatAddressesArrayField = (
  field: { address: string }[],
  defaultValue = "Desconocido"
) => {
  return field && Array.isArray(field)
    ? field
        .map((item) =>
          typeof item === "object" ? item.address || JSON.stringify(item) : item
        )
        .join(", ")
    : defaultValue;
};

export const formatRichText = (value: any, defaultValue = "Desconocida") => {
  if (!value) return defaultValue;

  const formatNode = (node) => {
    if (!node || !node.children) return "";

    return node.children
      .map((child) => {
        if (child.type === "text") {
          return child.text;
        } else if (child.type === "paragraph") {
          return formatNode(child) + "\n";
        } else if (child.type === "heading") {
          return " ".repeat(node.level - 1) + formatNode(child) + "\n";
        } else if (child.type === "list") {
          return formatList(child) + "\n";
        } else if (child.type === "list-item") {
          return "- " + formatNode(child) + "\n";
        }
        return "";
      })
      .join("");
  };

  const formatList = (list) => {
    return list.children.map(formatNode).join("");
  };

  return value.map(formatNode).join("\n").trim();
};
