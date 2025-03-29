'use client'
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AppContextProps {
    user: any;
    currency: string | undefined;
    router: ReturnType<typeof useRouter>;
    isSeller: boolean;
    setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
    userData: any;
    products: any[];
    cartItems: Record<string, number>;
    setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    addToCart: (itemId: string) => void;
    updateCartQuantity: (itemId: string, quantity: number) => void;
    getCartCount: () => number;
    getCartAmount: () => number;
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
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();
    const { user } = useUser();

    const [products, setProducts] = useState<any[]>([]);
    const [userData, setUserData] = useState<any>(null);
    const [isSeller, setIsSeller] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState<Record<string, number>>({});



    const addToCart = (itemId: string) => {
        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            newCart[itemId] = (newCart[itemId] || 0) + 1;
            return newCart;
        });
    };

    const updateCartQuantity = (itemId: string, quantity: number) => {
        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            if (quantity === 0) {
                delete newCart[itemId];
            } else {
                newCart[itemId] = quantity;
            }
            return newCart;
        });
    };

    const getCartCount = (): number => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const getCartAmount = (): number => {
        return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
            const itemInfo = products.find((product) => product._id === itemId);
            return itemInfo ? total + itemInfo.offerPrice * qty : total;
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
                getCartCount,
                getCartAmount
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
