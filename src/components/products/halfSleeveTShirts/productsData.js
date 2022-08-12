function productsData() {
  return [
    {
      path: "/half-sleeve-cut-and-sew-solid-pattern-15",
      img: "https://res.cloudinary.com/du3oueesv/image/upload/v1659873489/shopping%20cart/half%20sleeve%20cut/mthcssp10-solid-350x435_zvwuma.jpg",
      breadCrumbs: [
        {
          name: "HOME",
          path: "/",
        },
        {
          name: "HALF SLEEVE CUT T-SHIRTS",
          path: "/half-sleeve-cut-and-sew-solid",
        },
      ],
      name: "Half Sleeve Cut and Sew Solid(pattern 15)",
      price: "৳450",
      details: ["Fabric: 100% Cotton", "GSM: 160-165"],
      fabric: ["COMBED COTTON"],
      size: ["M", "L", "XL", "XXL"],
      description: [
        "M(Medium): Chest 39.37″ inch/ 100 cm, Height 27.55″ inch/ 70 cm",
        "L(large) : Chest 40.94″inch/ 104 cm, Height 28.34″inch/ 72 cm",
        "XL(Extra large): Chest 42.51″ inch/ 108 cm, Height 29.13″ inch/ 74 cm",
        "XXL(Extra large) : Chest 44.09″ inch/ 112 cm, Height 29.92″ inch/ 76 cm",
      ],
      additionalInfo: {
        weight: "0.13kg",
        fabric: "COMBED COTTON",
        size: "M, L, XL, XXL",
      },
    },
  ];
}

function getProductData(searchPath) {
  return productsData().find((product) => {
    const productPath = product.path.split("/").pop();
    return productPath === searchPath;
  });
}

export default getProductData;
