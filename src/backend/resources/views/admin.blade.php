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

<body class="bg-gray-200 min-h-screen">
    @if(session('success'))
        <div class="w-full flex justify-center items-center bg-green-300 h-16" role="alert">
        {{ session('success') }}
        </div>
        @elseif(session('error'))
        <div class="w-full flex justify-center items-center bg-red-300 h-16" role="alert">
        {{ session('error') }}
        </div>
    @endif
    <nav class="w-full">
        <div class="flex bg-gray-50 justify-between items-center border border-b border-gray-300 h-24 px-8">
            <div>
                LiftingPal Admin Dashboard
            </div>
            <div>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit">Logout</button>
                </form>
            </div>
        </div>
    </nav>
    <div class="flex flex-col w-full pt-8 items-center justify-center">
        <h2 class="text-center font-bold text-2xl">Users</h2>
        <form class="mt-8 mb-4" action="/admin/users" method="GET">
            @csrf
            <input type="text" name="query" value="{{ request('query') }}" placeholder="Search...">
            <button type="submit">Search</button>
        </form>
        <table class="bg-white rounded-xl border border-gray-300 w-1/2">
            <thead>
                <tr class="border-b border-gray-300">
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user )
                <tr class="border-b border-gray-300">
                    <th>{{ $user->user_id }}</th>
                    <th>{{ $user->name }}</th>
                    <th>{{ $user->email }}</th>
                    <th>
                        <form action="/admin/user/{{ $user->user_id }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="w-16 h-8 text-red-800 bg-red-400 border border-red-600">Delete</button>
                        </form>
                    </th>
                </tr>
                @endforeach
            </tbody>
        </table>
        {{-- Pagination links --}}
        <div class="mt-4">
            {{ $users->links() }}
        </div>

        <h2 class="text-center mt-8 font-bold text-2xl">Exercises</h2>
        <div class="flex flex-row gap-4">
            <div class="">
                <form class="items-center mt-8 mb-4" action="/admin/exercises" method="GET">
                    @csrf
                    <input type="text" name="query" value="{{ request('query') }}" placeholder="Search...">
                    <button type="submit">Search</button>
                </form>
            </div>
            <div class="flex justify-center items-center">
                <a href="/admin/exercise/create">Create exercise -></a>
            </div>
        </div>
        <table class="bg-white rounded-xl border border-gray-300 w-1/2">
            <thead>
                <tr class="border-b border-gray-300">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($exercises as $exercise )
                <tr class="border-b border-gray-300">
                    <th>{{ $exercise->exercise_id }}</th>
                    <th>{{ $exercise->name }}</th>
                    <th>
                        <form action="/admin/exercise/{{ $exercise->exercise_id }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="w-16 h-8 text-red-800 bg-red-400 border border-red-600">Delete</button>
                        </form>
                    </th>
                </tr>
                @endforeach
            </tbody>
        </table>
        {{-- Pagination links --}}
        <div class="mt-4">
            {{ $exercises->links() }}
        </div>
    </div>
</body>