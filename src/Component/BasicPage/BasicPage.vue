<template>
    <div>
        <AddLink @add-link="addLink"/>
        <LinkList v-bind:link="link" @remove-link="removeLink" @update-click="clickURL"/>
    </div>
    
</template>
<script>
import AddLink from '../AddLink/AddLink.vue'
import LinkList from '../LinkList/LinkList.vue'
import URL from '../URL/URL'
export default {
    data(){
        return {
            link:[],
            loading:true,
            edit:false,
        }
    },
    components:{
        AddLink,
        LinkList
    },
     mounted(){
      fetch(URL+'getAllLink')
      .then(response => response.json())
      .then(json=>{
          this.link=json.link
          this.loading = false
      })
    },
    methods:{
        addLink(link){
            this.link.push(link)
        },
        removeLink(_id){
            this.link = this.link.filter(t=>t._id !==_id)
        },
        clickURL(lnk,id){
            this.link = this.link.map(t=>{
            if(t._id===id){
            fetch(URL+'UpDateLink/'+id,{
                method:'PUT',
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify({
                click: lnk
                })
            })
            return {  
                ...t,
                click: lnk
            }  
            }
            return t;
            })
        }
    }
}
</script>