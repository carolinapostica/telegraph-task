const { Utils, FETCH_URL } = require("./utils");
const mock = require("../../db.json");

const unsortedArray = [{
		id: 1,
		date: "2019-04-23T19:26:41.511Z",
		name: "Lennie Wainwright",
		body: "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
		likes: 4,
	},
	{
		id: 2,
		date: "2019-04-23T19:26:41.511Z",
		name: "Abigail Smith",
		body: "Lorem impsum dolores sith ambre",
		likes: 20,
	}
];

const sortedArray = [{
		id: 2,
		date: "2019-04-23T19:26:41.511Z",
		name: "Abigail Smith",
		body: "Lorem impsum dolores sith ambre",
		likes: 20,
	},
	{
		id: 1,
		date: "2019-04-23T19:26:41.511Z",
		name: "Lennie Wainwright",
		body: "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
		likes: 4,
	},
];

describe( 'Utils', () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve(mock),
		})
	);

	beforeEach(() => {
		fetch.mockClear();
	});

	describe( 'sortData', () => {
		it("should sort by 'likes' key", () => {
			const utils = new Utils();
			expect(utils.sortData(unsortedArray)).toEqual(sortedArray);
		});

		it("should return empty array if nothing is passed to sort", () => {
			const utils = new Utils();
			expect(utils.sortData()).toEqual([]);
		});
	});

	describe( 'fetchData', () => {
		it("should return mock api on calling passed fetch URL", async () => {
			const utils = new Utils();

			await expect(utils.fetchData()).resolves.toEqual(mock);
			expect(fetch).toHaveBeenCalledWith(FETCH_URL);
		});

		it("should return error message in reject", async () => {
			const utils = new Utils();
			const errorMessage = "API is down";
			fetch.mockImplementationOnce(() => Promise.reject(errorMessage));

			const result = await utils.fetchData();
			expect(result).toEqual(errorMessage);
		});
	});
});
