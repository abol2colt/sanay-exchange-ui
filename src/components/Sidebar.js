export const Sidebar = () => {
  return `

  <aside class="w-60 bg-gray-900 border-r border-gray-800">

    <div class="p-6 font-bold text-xl">
      Exchange
    </div>

    <nav class="flex flex-col gap-2 p-4">

      <a class="hover:bg-gray-800 p-2 rounded">
        Market
      </a>

      <a class="hover:bg-gray-800 p-2 rounded">
        Trade
      </a>

      <a class="hover:bg-gray-800 p-2 rounded">
        Wallet
      </a>

    </nav>

  </aside>

  `;
};
