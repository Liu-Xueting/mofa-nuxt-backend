<template>
  <div class="min-h-screen w-full">
    <AppConfigProvider>
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator :duration="300" color="oklch(var(--p)/0.5)" class="shadow-primary" />
      <NuxtLayout class="w-full overflow-x-hidden">
        <NuxtPage />
      </NuxtLayout>
    </AppConfigProvider>
  </div>
</template>
