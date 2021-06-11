<template>
    <div>
        <!-- <form action="" method="POST" class="my-4 form-inline"> -->
            <label for="fullUrl" class="sr-only">URL</label>
            <input type="url" name="fullUrl" id="fullUrl" v-model="link">
            <button v-on:click="onSubmit" type="submit">Shkf</button>
        <!-- </form> -->
        <hr>  
    </div>
</template>
<script>
import URL from '../URL/URL'
export default {
    data(){
        return{
            link:''
        }
    },
    methods:{
        onSubmit(){
            if(this.link.trim()){
                const Url = {
                    baseLink:this.link
                }
                // console.log(newTodo)
                 fetch(URL+"newShortLink",{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body:JSON.stringify(Url)
                    })
                   .then(response => response.json())
                    .then(json=>{
                        console.log(json)
                        this.Url=json
                        this.$emit('add-link',this.Url)
                    })
                this.link = ''
                
            }
        }
    }
}
</script>