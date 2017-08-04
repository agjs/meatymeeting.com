<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <router-view></router-view>
                <div class="intro" v-show="introduction">
                    <div class="col s6">
                        <img class="intro__logo" src="images/logo.svg" alt="Meany Meetings logo">
                    </div>
                    <h1 class="intro__text-logo">Meaty
                        <span>Meeting</span>
                    </h1>
                    <div class="col s6">
                        <p class="intro__description">
                            Hi And welcome to Meaty Meeting. We're all about helping people to have meetings full of substance. We've all tried being part of a great meeting. And we've all tried being part of a meeting that drains your energy so fast that an unlimited supply of coffee and Duracell batteries won't help you any bit. We want to help you have the former. Every time. Let's get started!
                        </p>
                        <button @click="get_starter()" class="btn waves-effect waves-light blue-grey darken-4 intro__get-starter">
                            Get started
                        </button>
                    </div>
                </div>
    
                <div class="qs-container" v-show="!introduction">
                    <div class="col s6">
                        <img class="left-image" :src="flow[flow_step].image">
                    </div>
                    <div class="col s6">
                        <h1 class="intro__text-logo">Meaty
                            <span>Meeting</span>
                        </h1>
                        <h6>{{flow[flow_step].question}}</h6>
                        <p v-if="flow[flow_step].description">
                            {{flow[flow_step].description}}
                        </p>
                        <div class="row" v-if="flow[flow_step].inputs">
                            <template v-for="(input, index) of flow[flow_step].inputs">
                                <template v-if="input.type==='number'">
                                    <div class="input-field col s6" v-if="input.type==='number'">
                                        <input :id="input.name" type="number" v-model.number="$data.request[input.name]">
                                        <label :for="input.name">{{input.label}}</label>
                                </template>
                                <template v-if="input.type==='text'">
                                    <div class="input-field col s12">
                                        <input :id="input.name" type="text" v-model="$data.request[input.name]">
                                        <label :for="input.name">{{input.label}}</label>
                                    </div>
                                </template>
                            </template>
                            </div>
                            <div v-show="$data.flow_step===2 || $data.flow_step===4" class="row">
                                <div v-if="$data.flow_step===4" class="input-field col s12">
                                    <input id="name" type="text" v-model="$data.request.name">
                                    <label for="name">Give your meeting a name</label>
                                </div>
                                <div class="input-field col s12">
                                    <template v-if="$data.flow_step===2">
                                        <textarea data-length="140" maxlength="140" minlength="5" id="context" id="textarea1" class="materialize-textarea" v-model="$data.request.context"></textarea>
                                        <label for="context">Context of your meeting</label>
                                    </template>
                                    <template v-if="$data.flow_step===4">
                                        <textarea data-length="140" maxlength="140" minlength="5" id="context" id="textarea1" class="materialize-textarea" v-model="$data.request.agenda"></textarea>
                                        <label for="context">Write your agenda in comma separated values (agenda item 1, agenda item 2...)</label>
                                    </template>
                                </div>
                            </div>
                            <button v-show="nextActive" :disabled="buttonActive" @click="generateQuestion()" class="btn waves-effect waves-light blue-grey darken-4 intro__get-starter">Next</button>
                            <div v-if="buttonGroupVisible" v-show="!nextActive && $data.flow_step === 1 || !nextActive && $data.flow_step === 3" class="input-group">
                                <button @click="answerQuestion('yes')" class="btn waves-effect waves-light blue-grey darken-4">Yes</button>
                                <button @click="answerQuestion('no')" class="btn waves-effect waves-light blue-grey darken-4">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>


<script>
export default {
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<style lang="scss">
body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

main {
    flex: 1 0 auto;
}
</style>