<template>
    <div >
        <table>
            <tr><th>Full Url</th><th>Short Url</th><th>date</th><th>date update</th><th>delete</th></tr>
            <tbody v-for="links in link" :key="links.baseLink">
                <tr>
                    <td>{{links.baseLink}}</td>
                    <td v-on:click="clickURL(links.click,links._id)">
                        <a :href='"http://localhost:4001/"+links.shortLink' >http://localhost:4001/{{links.shortLink}}</a>
                    <td>{{links.click}}</td>
                    <td>{{links.date}}</td>
                    <td v-on:click="removeblog(links._id)" > &#10006;</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import URL from '../URL/URL'
export default {
    props:['link'],
    data(){
        return {
            counter:Number()
        }
    },
    methods:{
        removeblog(_id){
            fetch(URL+"deleteLink/"+_id,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
            this.$emit('remove-link',_id)
        },
        clickURL(lnk,id){
            this.counter=lnk+1
            this.$emit('update-click',this.counter,id)
        }
    }
}
</script>
<style>
table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  background: white;
  max-width: 100%;
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th {
  font-weight: normal;
  color: #039;
  border-bottom: 2px solid #6678b1;
  padding: 10px 8px;
}
td {
  color: #669;
  padding: 9px 8px;
  transition: .3s linear;
}
tr:hover td {
  color: #6699ff;
}
</style>