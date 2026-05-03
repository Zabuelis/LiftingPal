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
<body class="flex bg-indigo-300 min-h-screen justify-center items-center">
    <div class="rounded-xl border-2 border-gray-300 bg-gray-100 h-96 w-80">
        <div class="flex items-center justify-center">
            <h2 class="font-bold text-2xl">Login</h2>
        </div>
        <div class="pt-8 h-64 flex items-center justify-center">
            <form method="POST" action="/login" class="grid gap-4 items-center justify-center">
                @csrf
                <div>
                    <label for="email">Email</label><br>
                    <input class="border-2 border-gray-300 rounded-md" type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label for="password">Password</label><br>
                    <input class="border-2 border-gray-300 rounded-md" type="password" id="password" name="password" required/>
                </div>
                <div class="flex items-center justify-center">
                    <input class="w-24 bg-indigo-300 border border-gray-300 rounded-xl" type="submit" value="Submit">
                </div>
            </form>
        </div>
    </div>
</body>