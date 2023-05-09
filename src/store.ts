import create from "zustand";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface Address {
  street: string;
  city: string;
}

export interface Data {
  id: string;
  name: string;
  email: string;
  gender: string;
  address: Address;
  phone: string;
}

export interface State {
  data: Data[];
  getData: () => Promise<void>;
  addData: (newData: Omit<Data, "id">) => Promise<void>;
  updateData: (
    id: string,
    updatedData: Partial<Omit<Data, "id">>
  ) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
}

export const useStore = create<State>((set) => ({
  data: [],
  async getData() {
    try {
      const response = await axios.get<Data[]>("http://localhost:3000/data");
      set({ data: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  async addData(newData) {
    try {
      const id = uuidv4();
      const dataWithId = { ...newData, id };
      const response = await axios.post(
        "http://localhost:3000/data",
        dataWithId
      );
      set((state) => ({ data: [...state.data, response.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  async updateData(id, updatedData) {
    try {
      await axios.put(`http://localhost:3000/data/${id}`, updatedData);
      const { data: updatedItem } = await axios.get<Data>(`http://localhost:3000/data/${id}`);
  
      set((state: State) => ({
        data: state.data.map((item) => (item.id === id ? updatedItem : item))
      }));
    } catch (error) {
      console.error(error);
    }
  },
  async deleteData(id) {
    try {
      await axios.delete(`http://localhost:3000/data/${id}`);
      console.dir(id);
      set((state) => ({ data: state.data.filter((d) => d.id != id) }));
    } catch (error) {
      console.error(error);
    }
  },
}));
