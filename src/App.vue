<template>
  <div id="app">
    <NavBar class="mb-3"/>
    <Links />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Links from '@/views/Links.vue'

export default {
  name: 'App',
  components: { 
    NavBar, 
    Links  
  }
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

</style>

