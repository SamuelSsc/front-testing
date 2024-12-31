import { tv } from "tailwind-variants";

export const cardStyle = tv({
    slots: {
        base: "rounded-lg shadow-md border border-gray-200", 
        header: "p-md border-b",    
        body: "p-md",                 
        footer: "p-md border-t",     
      },    
});
