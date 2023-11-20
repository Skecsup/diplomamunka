<script>

const getPosts = async()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    return data
}
</script>

{#await getPosts()}
    <p>Loading...</p>
{:then data} 
<div class="container">
{#each data as {title, body}}
<div class="card">
    <h4 >{title}</h4>
    <p>{body}</p>
</div>
{/each}

</div>
{/await}

<style>
.container{
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap:16px;
padding: 16px;
}
.card{
border: 2px solid black;
width: 200px;
}

</style>