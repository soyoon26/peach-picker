import create from "zustand";

const useWinnerStore = create((set) => ({
  winners: [], // 당첨자 목록
  addWinner: (winner) =>
    set((state) => ({
      winners: [...state.winners, winner],
    })), // 당첨자 추가
  clearWinners: () => set({ winners: [] }), // 당첨자 목록 초기화
}));

export default useWinnerStore;
