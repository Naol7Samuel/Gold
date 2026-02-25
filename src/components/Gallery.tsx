import * as React from "react";
import ProductModal, { Product } from "./ProductModal";

import sample1 from "@/assets/portfolio-1.jpg";
import sample2 from "@/assets/portfolio-2.jpg";

const sampleProducts: Product[] = [
  {
    title: "Round Brilliant Diamond",
    ref: "19581236",
    image: sample1,
    price: "Negotiable",
    specs: {
      shape: "Round",
      cut: "Excellent",
      color: "D",
      clarity: "VVS1",
      carat: "1.00 ct",
      fluorescence: "None",
      polish: "Excellent",
      symmetry: "Very Good",
      certification: "GIA Certified",
      origin: "Botswana",
    },
  },
  {
    title: "Emerald Cut Diamond",
    ref: "19581237",
    image: sample2,
    price: "$25,000",
    specs: {
      shape: "Emerald",
      cut: "Very Good",
      color: "E",
      clarity: "VS2",
      carat: "2.05 ct",
      fluorescence: "Faint",
      polish: "Very Good",
      symmetry: "Good",
      certification: "GIA Certified",
      origin: "South Africa",
    },
  },
];

export default function Gallery() {
  const [selected, setSelected] = React.useState<Product | null>(null);
  const [open, setOpen] = React.useState(false);

  function handleClick(p: Product) {
    setSelected(p);
    setOpen(true);
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sampleProducts.map((p) => (
          <div
            key={p.ref}
            className="relative cursor-pointer overflow-hidden rounded-lg bg-onyx/50 hover:scale-105 transition-transform"
            onClick={() => handleClick(p)}
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ))}
      </div>

      <ProductModal
        product={selected}
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelected(null);
        }}
      />
    </>
  );
}
