import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import VueLocalStorage from 'vue-localstorage';
import Root from './components/root.html';

Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(VueLocalStorage);

const root = {
  template: Root
};

const Meeting = {
  template: '<div>User {{ $route.params.slug }}</div>'
};

const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '/meeting/:slug', component: Meeting }
  ]
});

const app = new Vue({
  router,
  data: {
    request: {
      attendances: 0,
      name: '',
      hours: 0,
      context: '',
      agenda: ''
    },
    buttonGroupVisible: true,
    introduction: true,
    flow_step: 0,
    flow: [
      {
        question: 'How many people are you planning to meet and for how long ?',
        image: 'images/team.svg',
        inputs: [
          // {
          //   name: 'meeting_name',
          //   label: 'Name your meeting',
          //   type: 'text'
          // },
          {
            name: 'attendances',
            label: 'Number of Attendances',
            type: 'number'
          },
          {
            name: 'hours',
            label: 'Number of Hours',
            type: 'number'
          }
        ]
      },
      {
        question: 'Have you thought through this situation ?',
        description:
          "Have you spent time thinking through this situation? It can be incredibly powerful to take the time to think ahead and imagine other people's perspective on a certain subject. It will allow you to be much better prepared. And in some cases, you'll even realize that you can progress without outside input.",
        image: 'images/bulb.svg',
        no:
          'We recommend that you schedule time to think it through (for example by going for a walk or grab a coffee or simply stop and think) before you decide on your next action.'
      },
      {
        question:
          'Awesome! Then please describe the context for having the meeting in a tweet.',
        image: 'images/tweet.svg',
        description:
          'Example: The purpose of this meeting is to brainstorm on how we can improve our decreasing retention rate and decide on concrete actions to be taken.'
      },
      {
        question:
          'Perfect. This will help you to focus on the actual purpose of the meeting and provide context to the other participants. However, does moving forward necessarily require a real-time interaction?',
        image: 'images/interaction.svg',
        no:
          'Then we highly recommend that you share the context with your teammates using Slack, Basecamp or email and get the conversation started there'
      },
      {
        question:
          'Okay, we hear you. Then please add your meeting name and agenda here (the compass for the conversation). This is to help you stay on track and include the other participants in your structure for the meeting before the event. And it will help them show up prepared as well.',
        image: 'images/agenda.svg'
      },
      {
        question: 'Your rock!',
        description:
          "We have generated a unique link with the context for the meeting as well as the agenda. You can now add this link to your meeting invitation. We wish you a meaty meeting! PS. To help your meeting flow even better we recommend using Airtame to present wirelessly. You'll look like a rockstar, and you'll avoid using those pesky cables.",
        image: 'images/success.svg'
      }
    ]
  },
  watch: {},
  computed: {
    buttonActive: function() {
      return !this.request.hours ||
      (this.flow_step === 2 && !this.request.context) ||
      !this.request.attendances
        ? true
        : false;
    },
    nextActive: function() {
      return (
        this.flow_step === 0 || this.flow_step === 2 || this.flow_step === 4
      );
    }
  },
  methods: {
    get_starter() {
      this.introduction = false;
    },
    generateQuestion() {
      console.log(this.flow_step);
      if (this.flow_step <= 3) {
        this.flow_step += 1;
        // this.created();
      } else {
        this.flow_step += 1;
        this.created();
      }
    },
    answerQuestion(answer) {
      if (this.flow_step === 1) {
        if (answer === 'yes') {
          console.log('yes');
          this.generateQuestion();
        } else {
          this.flow[this.flow_step].question = '';
          this.flow[this.flow_step].description = this.flow[this.flow_step].no;
          this.flow[this.flow_step].image = 'images/coffee.svg';
          this.buttonGroupVisible = false;
        }
      }

      if (this.flow_step === 3) {
        if (answer === 'yes') {
          console.log('yes');
          this.generateQuestion();
        } else {
          this.flow[this.flow_step].question = '';
          this.flow[this.flow_step].description = this.flow[this.flow_step].no;
          this.flow[this.flow_step].image = 'images/share.svg';
          this.buttonGroupVisible = false;
        }
      }
    },
    created: function() {
      this.$http.post('http://localhost:3000/api/meetings', this.request).then(
        response => {
          console.log(response);
        },
        error => {
          console.log(`The error is ${error}`);
        }
      );
    }
  }
}).$mount('#app');

// If yes -> Awesome! Then please describe the context for having the meeting in a tweet (Add: Input field with an example: 1) The purpose of this meeting is to go through the backlog of requested features and decide on how and why they should be prioritized into our roadmap. 2) The purpose of this meeting is to brainstorm on how we can improve our decreasing retention rate and decide on concrete actions to be taken)
