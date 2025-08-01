import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  totalPrice: number;
  deliveryFee: number;
  finalTotal: number;
  status: 'pending' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  orderDate: Date;
  estimatedDeliveryTime: Date;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate' | 'estimatedDeliveryTime' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RP${timestamp}${random}`;
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate' | 'estimatedDeliveryTime' | 'status'>) => {
    const now = new Date();
    const estimatedDelivery = new Date(now.getTime() + 30 * 60 * 1000); // 30 dakika sonra

    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substring(7),
      orderNumber: generateOrderNumber(),
      orderDate: now,
      estimatedDeliveryTime: estimatedDelivery,
      status: 'delivered', // Direkt olarak teslim edildi olarak işaretle
    };

    setOrders(currentOrders => [newOrder, ...currentOrders]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const value: OrderContextType = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}; 