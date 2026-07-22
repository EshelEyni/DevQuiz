"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertQueryParamsToBoolean = exports.trimCollectionNameFromId = exports.setIdToCollectionName = exports.queryRavenDB = exports.DEFAULT_QUESTION_LIMIT = void 0;
const server_1 = require("../server");
require("dotenv").config();
exports.DEFAULT_QUESTION_LIMIT = 10;
async function queryRavenDB(queryString, collection) {
    const setFilter = (queryString, query) => {
        const queryObj = { ...queryString };
        const excludedFields = ["page", "sort", "limit", "fields", "searchTerm", "searchField"];
        excludedFields.forEach(el => delete queryObj[el]);
        for (const key in queryObj) {
            if (queryObj[key] === undefined)
                continue;
            query = query.whereEquals(key, queryObj[key]);
        }
    };
    const { page, sort, limit } = queryString;
    const session = server_1.ravenStore.openSession();
    const query = session.query({ collection });
    if (page)
        query.skip(Number(page));
    if (limit)
        query.take(Number(limit));
    if (sort)
        query.orderBy(sort);
    setFilter(queryString, query);
    return await query.all();
}
exports.queryRavenDB = queryRavenDB;
function convertQueryParamsToBoolean(value) {
    if (value === undefined)
        return undefined;
    if (value === "true")
        return true;
    if (value === "false")
        return false;
}
exports.convertQueryParamsToBoolean = convertQueryParamsToBoolean;
function setIdToCollectionName(collectionName, id) {
    return `${collectionName}/${id}`;
}
exports.setIdToCollectionName = setIdToCollectionName;
function trimCollectionNameFromId(id) {
    return id.split("/")[1];
}
exports.trimCollectionNameFromId = trimCollectionNameFromId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3V0aWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBdUM7QUFFdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBWWQsUUFBQSxzQkFBc0IsR0FBRyxFQUFFLENBQUM7QUFFekMsS0FBSyxVQUFVLFlBQVksQ0FBQyxXQUF3QixFQUFFLFVBQWtCO0lBQ3RFLE1BQU0sU0FBUyxHQUFHLENBQUMsV0FBd0IsRUFBRSxLQUE2QixFQUFFLEVBQUU7UUFDNUUsTUFBTSxRQUFRLEdBQWdCLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUNqRCxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEYsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEQsS0FBSyxNQUFNLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDMUIsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztnQkFBRSxTQUFTO1lBQzFDLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUMsQ0FBQztJQUNGLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQztJQUMxQyxNQUFNLE9BQU8sR0FBRyxtQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBRTVDLElBQUksSUFBSTtRQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkMsSUFBSSxLQUFLO1FBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyQyxJQUFJLElBQUk7UUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFOUIsT0FBTyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBaUJDLG9DQUFZO0FBZmQsU0FBUywyQkFBMkIsQ0FBQyxLQUF5QjtJQUM1RCxJQUFJLEtBQUssS0FBSyxTQUFTO1FBQUUsT0FBTyxTQUFTLENBQUM7SUFDMUMsSUFBSSxLQUFLLEtBQUssTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ2xDLElBQUksS0FBSyxLQUFLLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQztBQUN0QyxDQUFDO0FBY0Msa0VBQTJCO0FBWjdCLFNBQVMscUJBQXFCLENBQUMsY0FBc0IsRUFBRSxFQUFVO0lBQy9ELE9BQU8sR0FBRyxjQUFjLElBQUksRUFBRSxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQVFDLHNEQUFxQjtBQU52QixTQUFTLHdCQUF3QixDQUFDLEVBQVU7SUFDMUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFLQyw0REFBd0IifQ==