import { create } from "zustand";

const useUserStore = create((set) => ({
    token: '',
    user: {username: 'usernameZustand', 'email': 'test@test.comZustand'},
    rol: {roles: ['adminZ', 'veterinarioZ', 'responsableZ']},
    clearUser: () => set({user: {}}),
    clearToken: () => set({token: null}),
    setToken: (token) => set({token: token})
}));

export default useUserStore;