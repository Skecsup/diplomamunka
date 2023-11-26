<script lang="ts">
  
  import type { Product } from "../../types/product";
  import { onMount } from 'svelte';

  let responseData: Product[];
  let currentPage = 1;

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:8000/products?page=${currentPage}`);
      const data = await response.json();
      console.log(data);
      
      responseData = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onMount(() => {
   
    fetchData();
  });
</script>

<main>
    <button on:click={() => { (currentPage - 1 === 0 ? currentPage = 1 : currentPage--); fetchData(); }}>{'<'}</button>
    {currentPage}
    <button on:click={() => { (currentPage + 1 === 10 ? currentPage = 9 : currentPage++); fetchData(); }}>{'>'}</button>
  {#if responseData}
    <div class="container">
        {#each responseData as {title, desc, price, img}}
<div class="card">
    <h4 >{title}</h4>
    <p>{desc}</p>
    <p>{price}</p>
    <img src={img} alt={title} width={200} height={200}/>
</div>
{/each}
      
    </div>
  {:else}
    <p>No data available.</p>
  {/if}
</main>

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
