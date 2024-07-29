<script>
    import { workPage } from '../../store';
    let content = '';
    workPage.subscribe(val => {
        content = val;
    });

    function updateContent() {
        workPage.set(content);
        alert("done");
    }
</script>

<h1 class="font-serif text-6xl">Edit Work</h1>

<form on:submit|preventDefault={updateContent}>
    <textarea bind:value={content} class="w-full h-lvh"></textarea>
    <button type="submit">Update HTML Content</button>
</form>