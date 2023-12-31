export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
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
    setCoaches(state, payload) {
      state.coaches = payload;
    },
  },
  actions: {
    async registerCoachAction(context, data) {
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
        imageUrl: data.image,
      };

      const coachId = context.rootGetters.userId;
      const token = context.rootGetters.token;

      const response = await fetch(
        `https://find-a-doctor-vue-default-rtdb.europe-west1.firebasedatabase.app/coaches/${coachId}.json?auth=` +
          token,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      context.commit('registerCoach', {
        ...coachData,
      });
    },
    async loadCoaches(context) {
      const response = await fetch(
        `https://find-a-doctor-vue-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        // error
      }

      const coaches = [];

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
          imageUrl: responseData[key].imageUrl,
        };
        coaches.push(coach);
      }

      context.commit('setCoaches', coaches);
    },
  },
};
