import { create } from 'zustand'

export const useStore = create((set) => ({

  activeTab: 0,
  setActiveTab: (index) => set({ activeTab: index }),
  
  isEventPanelOpen: false,
  toggleisEventPanelOpen: () => set((prev) => ({ isEventPanelOpen: !prev.isEventPanelOpen })),

  eventsArray: [],
  setEventsArray: (data) => set({ eventsArray: data }),

  todosArray: [],
  setTodosArray: (data) => set({ todosArray: data }),

  cartsArray: [],
  setCartsArray: (data) => set({ cartsArray: data }),

  eventDialogData: null,
  setEventDialogData: (data) => set({ eventDialogData: data }),

  selectedDayInfo: new Date(),
  setselectedDayInfo: (data) => set({ selectedDayInfo: data }),

  selectedDay: new Date().toDateString(),
  setSelectedDay: (date) => set({ selectedDay: date }),

  useOpening: true,
  setUseOpening: () => set({ useOpening: false }),

  isOpeningEnd: false,
  setIsOpeningEnd: () => set({ isOpeningEnd: true }),
  
  audioRef: null,
  setAudioRef: (ref) => set({ audioRef: ref }),

  FETCH_URL: '',
  SET_FETCH_URL: (url) => set({ FETCH_URL: url }),
  
  isPlayingMusic: false,
  playedMusic: false,
  
}))
