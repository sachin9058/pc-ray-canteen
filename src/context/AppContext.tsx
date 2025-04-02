'use client'
import Items from "@/components/Items";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext,useState, ReactNode } from "react";

import { UserResource } from "@clerk/types"; // Import the correct type


interface Product{
    name : string
    image : string
    rating : number
    price  : number
    description : string
}
interface UserData {
    id: string;
    name: string;
    email: string;
  }

interface AppContextProps {
    user: UserResource | null;
    currency: string | undefined;
    router: ReturnType<typeof useRouter>;
    isSeller: boolean;
    setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
    userData: UserData | null;
    products: Product[];
    cartItems: Record<string, number>;
    setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    addToCart: (itemId: string) => void;
    updateCartQuantity: (itemId: string, quantity: number) => void;
    removeFromCart: (itemId: string) => void;
    getCartCount: () => number;
    getCartAmount: () => number;
    clearCart: () => void; 
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
    const currency = "₹"
    const router = useRouter();
    const user = useUser().user ?? null; 

    const [products] = useState<Product[]>(Items);
const [userData] = useState<UserData | null>(null);
    const [isSeller, setIsSeller] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState<Record<string, number>>({});


    const addToCart = (productName: string) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            updatedCart[productName] = (updatedCart[productName] || 0) + 1; // ✅ Update properly
            return { ...updatedCart }; // ✅ Return a new object to trigger re-render
        });
    };
    
    const clearCart = () => setCartItems({});
    const updateCartQuantity = (productName: string, quantity: number) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (quantity > 0) {
                updatedCart[productName] = quantity;
            } else {
                delete updatedCart[productName]; // ✅ Remove item if quantity is 0
            }
            return { ...updatedCart }; // ✅ Return new object
        });
    };
    const removeFromCart = (productName: string) => {
        setCartItems((prev: Record<string, number>) => {
            const updatedCart = { ...prev };
            delete updatedCart[productName]; // Remove item
            return updatedCart;
        });
    };
    const getCartCount = (): number => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const getCartAmount = (): number => {
        return Object.entries(cartItems).reduce((total, [productName, qty]) => {
            const itemInfo = products.find((product) => product.name === productName); // ✅ Match by name
            return itemInfo ? total + itemInfo.price * qty : total; // ✅ Use itemInfo.price
        }, 0);
    };
    return (
        <AppContext.Provider
            value={{
                user,
                currency,
                router,
                isSeller,
                setIsSeller,
                userData,
                products,
                cartItems,
                setCartItems,
                addToCart,
                updateCartQuantity,
                removeFromCart,
                getCartCount,
                getCartAmount,
                clearCart
                
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

