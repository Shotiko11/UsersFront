import create from 'zustand';
import axios from 'axios';

export interface Address {
  street: string;
  city: string;
}

export interface Data {
  id: number;
  name: string;
  age: number;
  email: string;
  gender: string;
  address: Address;
  phone: string;
}

export interface State {
  data: Data[];
  getData: () => Promise<void>;
  addData: (newData: Data) => Promise<void>;
  updateData: (id: number, updatedData: Partial<Data>) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
}

export const useStore = create<State>((set) => ({
  data: [],
  async getData() {
    try {
      const response = await axios.get('http://localhost:3000/data');
      set({ data: response.data });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  async addData(newData) {
    try {
      await axios.post('http://localhost:3000/data', newData);
      set((state) => ({ data: [...state.data, newData] }));
    } catch (error) {
      console.error(error);
    }
  },
  async updateData(id, updatedData) {
    try {
      await axios.put(`http://localhost:3000/data/${id}`, updatedData);
      await this.getData();
    } catch (error) {
      console.error(error);
    }
  },
  async deleteData(id) {
    try {
      await axios.delete(`http://localhost:3000/data/${id}`);
      set((state) => ({ data: state.data.filter((d) => d.id !== id) }));
    } catch (error) {
      console.error(error);
    }
  },
}));
