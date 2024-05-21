import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {username: 'usernameZustand', 'email': 'test@test.comZustand'},
    rol: {roles: ['adminZ', 'veterinarioZ', 'responsableZ']},
    clearUser: () => set({user: {}}),
}));

export default useUserStore;