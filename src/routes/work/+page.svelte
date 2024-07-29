<script>
    import { workPage } from '../../store';
    let content = '';
    workPage.subscribe(val => {
        content = val;
    });
</script>

{@html content}
