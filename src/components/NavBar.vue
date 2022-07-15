<template>
    <div class="navbar-main w-100">
       <b-navbar type="dark" variant="info">
            <b-navbar-brand><h2><b>{{ projectName }}</b></h2></b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    computed: {
        projectName() {
            return process.env.VUE_APP_FRONT_NAME
        }
    }

}
</script>
