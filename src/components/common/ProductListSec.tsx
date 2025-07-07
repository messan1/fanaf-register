"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";

type ProductListSecProps = {
  data: Product[];
  title: string;
  className?: string;
};

const ProductListSec = ({ data, title, className }: ProductListSecProps) => {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <h2
          className={cn([
            integralCF.className,
            "text-[32px] leading-[36px] md:text-5xl capitalize mb-8 md:mb-12",
          ])}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {data.map((product, index) => (
            <div key={product.id}>
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListSec;
