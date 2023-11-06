export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  getters: {
    getCoaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches.length > 0;
    },
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
  },
  actions: {
    registerCoachAction(context, data) {
      const coachData = {
        id: new Date().toISOString,
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      };

      context.commit('registerCoach', coachData);
    },
  },
};
