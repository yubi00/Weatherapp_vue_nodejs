<template>
    <div>
        <h1>{{message}}</h1>
        <form  method="POST" action="/">
          City: <input type="text" onfocus="this.value=''" name="cityname" v-model.lazy="cityname"/>
          <input type="submit" value="Submit" @click.prevent="getCityInfo()" name="usercity" />
        </form>
        <div v-if="showdiv">
          <h1>{{cityinfo}} </h1>
          <p> City Name: {{ cityname }} </p>
          <p> Temperature: {{ citytemp }}°C </p>
        </div>
        <div v-if="showerror">
            <h1>{{errormessage}} </h1>
        </div>
    </div>
</template>

<script>
import CityInfo from './CityInfo'
import axios from 'axios'

export default {
  name: 'HelloWorld', 
  components: {
    CityInfo
  },
  data() {
    return {
      cityname: '',
      citytemp: '',
      message: 'Weather App',
      cityinfo: 'City Info',
      showdiv: false,
      showerror: false,
      errormessage: ''
    }
  },
   async beforeCreate(){
    const response = await axios.get('http://localhost:3000')
    this.message = response.data.message;
  },
  methods: {
    async getCityInfo() {
      
      try{
         
          let response = await axios.post('http://localhost:3000', {
            cityname: this.cityname
          })

          let result = response.data
          this.cityname = result.cityname
          this.citytemp = this.celsiustemp(result.citytemp)
          this.showdiv = true
          this.showerror = false
          
      }
      catch(e) {
        this.showdiv = false;
        this.showerror = true;
        this.errormessage = e.response.data.message
        
      }
      
        
    },

    celsiustemp(kelvintemp){
      return kelvintemp - 273.15;
    },

  
  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
