<template>
	<div class="fixed top-0 left-0 right-0 bottom-0 bg-um-black bg-opacity-25 z-50 h-screen w-screen">
		<div class="container-row h-full">
			<div class="lg:col-span-6 col-span-2 lg:col-start-4 col-start-2 flex items-center flex-col justify-center">
				<div class="top bg-um-blue w-full h-12 relative">
					<Icon name="ic:twotone-question-mark"
						class="!fill-um-white [&>path]:fill-um-white h-8 w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				</div>
				<div class="bottom bg-um-white w-full">
					<div class="container p-0">
						<div class="lg:container-row container">
							<div class="col-span-8 lg:col-start-3 col-start-2 py-7">
								<slot></slot>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup></script>
