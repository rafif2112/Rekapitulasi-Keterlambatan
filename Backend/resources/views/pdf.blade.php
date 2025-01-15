<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Pernyataan</title>
    <style>
        body {
            display: flex;
            min-height: 100vh;
            align-items: center;
            justify-content: center;
            background-color: #f3f4f6;
            margin: 0;
        }

        .container {
            max-width: 768px;
            margin: auto;
            padding: 2.5rem;
            background-color: #ffffff;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .text-center {
            text-align: center;
        }

        .font-bold {
            font-weight: bold;
        }

        .mb-4 {
            margin-bottom: 1rem;
        }

        .mb-6 {
            margin-bottom: 1.5rem;
        }

        .mb-8 {
            margin-bottom: 2rem;
        }

        .flex {
            display: flex;
        }

        .justify-between {
            justify-content: space-between;
        }

        .mx-auto {
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 class="mb-4 text-center font-bold">SURAT PERNYATAAN</h1>
        <h2 class="mb-8 text-center font-bold">TIDAK AKAN DATANG TERLAMBAT KESEKOLAH</h2>

        <div class="mb-6">
            <p>Yang bertanda tangan dibawah ini :</p>
            <p>NIS : {{ $nis }}</p>
            <p>Nama : {{ $name }}</p>
            <p>Rombel : {{ $rombel }}</p>
            <p>Rayon : {{ $rayon }}</p>
        </div>

        <div class="mb-6">
            <p>Dengan ini menyatakan bahwa saya telah melakukan pelanggaran tata tertib sekolah, yaitu terlambat datang
                ke sekolah sebanyak <span class="font-bold">3 Kali</span> yang mana hal tersebut termasuk kedalam
                pelanggaran kedisiplinan. Saya berjanji tidak akan terlambat datang ke sekolah lagi. Apabila saya
                terlambat datang ke sekolah lagi saya siap diberikan sanksi yang sesuai dengan peraturan sekolah.</p>
        </div>

        <div class="mb-6">
            <p>Demikian surat pernyataan terlambat ini saya buat dengan penuh penyesalan.</p>
        </div>

        <div class="mb-6 flex justify-between">
            <div class="text-center">
                <p>Bogor, 24 November 2023</p>
                <p>Peserta Didik,</p>
                <br><br><br>
                <p>({{ $name }})</p>
            </div>
            <div class="text-center">
                <p>Orang Tua/Wali Peserta Didik,</p>
                <br><br><br>
                <p>( ............................ )</p>
            </div>
        </div>

        <div class="flex justify-between">
            <div class="text-center">
                <p>Pembimbing Siswa,</p>
                <br><br><br>
                <p>{{ $pembimbing }}</p>
            </div>
            <div class="text-center">
                <p>Kesiswaan,</p>
                <br><br><br>
                <p>( ............................ )</p>
            </div>
        </div>
    </div>
</body>

</html>
