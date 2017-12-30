<template>
    <div id="app" class="col">
        <main class="row full">
            Ứng dụng đang chạy trên điện thoại tại địa chỉ
            <br/>
            Đã tắt dòng io() trong script. 
        </main>
    </div>
</template>
<script>
    export default {
        name: 'app',
        mounted() {
            console.clear();
        }
    };
</script>