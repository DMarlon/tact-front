<template>
	<b-container fluid>
		<Options title="Contacts" :searchOptions="searchOptions" :searchResult="searchResult" @onLoad="load" @onPaginate="goToPage" class="mb-4" />
		<b-table class="p-2" striped hover :fields="fields" :items="items" sort-icon-left no-local-sorting :sort-by="searchOptions.order" :sort-desc="searchOptions.direction == 'desc'" @sort-changed="changeOrder">
			<template v-slot:cell(image)="data">
                <b-img rounded="circle" :src="data.item.imagePath"/>
            </template>
		</b-table>
	</b-container>
</template>

<script>
import Options from "@/components/list/Options";

export default {
	name: "List",
	components: { Options },
	created() {
		this.load()
	},
	data() {
		return {
			searchOptions: {
                page: 1,
                limit: 20,
                order: "name",
                direction: "asc",
                term: ""
            },
            searchResult: {
                totalRecords: 0,
                totalPages: 0
            },
			fields: [
				{ key: "id", label: "Id", class: "col-1", sortable: true }, 
				{ key: "name", label: "Name", sortable: true }, 
				{ key: "image", label: "Image", class: "col-1" }, 
			],
			items: []
		}
	},
	methods: {
		async load() {
			try {
				this.flushImgSrcToCleanCache()

				const response = await this.$http.unauthenticated().get(this.$pathapi.contact.paged(), { params: { ...this.searchOptions } });
				if (response && response.data) {
					this.handlerContent(response.data)
					this.handlerSearchResult(response.data)
					this.handlerSearchOptions(response.data)
				} else {
					this.searchOptions.page = 1;
				}				
			} catch (error) {
				console.log(error.response ?? error)
				alert("Error to load your contacts!")
			}
		},
		flushImgSrcToCleanCache() {
			if (Array.isArray(this.items)) {
				this.items = this.items.map(item => ({...item, imagePath: ""}))
			}
		},
		handlerContent(data){
			this.items = data.content.map(this.buildModel)
		},
		handlerSearchResult(data){
			this.searchResult = {
				totalRecords: data.totalRecords ?? 0,
				totalPages: data.totalPages ?? 0
			};
		},
		handlerSearchOptions(data){
			if (data.currentPage == 0)
				this.searchOptions.page = 1;
			else if (this.searchOptions.page > data.totalPages)
				this.searchOptions.page = data.currentPage;
		},
		buildModel(item) {
			return {
				id: item.id,
				name: item.name,
				imagePath: item.imagePath
			}
		},
		changeOrder(order) {
            if (order.sortBy != "") {
                this.searchOptions.order = order.sortBy;
                this.searchOptions.direction = order.sortDesc ? "desc" : "asc";
                this.load();
            }
        },
		showDetail(item) {
			this.$router.push({ name: 'detail', params: { urlId: item.id } });
		},
		goToPage(page) {
            this.searchOptions.page = page;
            this.load();
        }
	}
}
</script>

<style>
img {
	width: 100px;
	height: 100px;
	object-fit: contain;
	background-color: #999;
}
</style>