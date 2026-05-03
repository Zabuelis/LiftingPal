<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Styles / Scripts -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    @if(session('success'))
        <div class="w-full flex justify-center items-center bg-green-300 h-16" role="alert">
        {{ session('success') }}
        </div>
        @elseif(session('error'))
        <div class="w-full flex justify-center items-center bg-red-300 h-16" role="alert">
        {{ session('error') }}
        </div>
    @endif
    <div class="flex bg-indigo-300 min-h-screen justify-center items-center">
        <div class="rounded-xl border-2 border-gray-300 bg-gray-100 h-96 w-80">
            <div class="flex items-center justify-center">
                <h2 class="font-bold text-2xl">Create Exercise</h2>
            </div>
            <div class="pt-8 h-64 flex items-center justify-center">
                <form method="POST" action="/admin/exercise/create" class="grid gap-4 items-center justify-center">
                    @csrf
                    <div>
                        <label for="name">Exercise Name</label><br>
                        <input class="border-2 min-h-20 border-gray-300 rounded-md" type="text" id="name" name="name" rows="4" maxlength="128" required/>
                    </div>
                    <div>
                        <label for="password">Description</label><br>
                        <textarea class="border-2 w-48 min-h-20 border-gray-300 rounded-md" id="description" rows="4" name="description" maxlength="128" required></textarea>
                    </div>
                    <div class="flex items-center justify-center">
                        <input class="w-24 bg-indigo-300 border border-gray-300 rounded-xl" type="submit" value="Create">
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>