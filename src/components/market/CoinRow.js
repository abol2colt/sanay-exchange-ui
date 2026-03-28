export const CoinRow = (coin) => {
  console.log(coin);
  return `
    <div
      class="
        flex
        items-center
        justify-between
        p-4
        border-b
        w-full
        border-gray-800
        hover:bg-gray-800
        transition
      "
    >

      <div class="flex items-center gap-3">

        <img
          src="${coin.image}"
          class="w-8 h-8"
        />

        <span class="font-medium">
          ${coin.name}
        </span>

      </div>

      <div
        id="price-${coin.symbol}"
        class="font-mono text-green-400"
      >
        $${coin.price}
      </div>

    </div>
  `;
};
