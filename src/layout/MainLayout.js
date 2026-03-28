export const MainLayout = (content) => {
  return `

  <div class="flex h-screen bg-gray-950 text-white">

    ${Sidebar()}

    <div class="flex-1 flex flex-col">

      ${Header()}

      <main class="p-6 overflow-auto">

        ${content}

      </main>

    </div>

  </div>

  `;
};
