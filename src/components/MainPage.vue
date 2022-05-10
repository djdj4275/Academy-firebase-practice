<template>
    <div>
        <h1>메인페이지입니다</h1>
        <img v-if="fnGetUser.photoURL" :src="fnGetUser.photoURL">
        <h3>{{fnGetUser.name}}</h3>
        <p>{{fnGetUser.email}}</p>
    </div>
</template>

<script>
export default {
    computed : {
        fnGetUser() {
            let oUserInfo = this.$store.getters.fnGetUser
            return oUserInfo
        }
    }
}
</script>