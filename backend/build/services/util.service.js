"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimCollectionNameFromId = exports.setIdToCollectionName = exports.queryRavenDB = void 0;
const server_1 = require("../server");
require("dotenv").config();
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
function setIdToCollectionName(collectionName, id) {
    return `${collectionName}/${id}`;
}
exports.setIdToCollectionName = setIdToCollectionName;
function trimCollectionNameFromId(id) {
    return id.split("/")[1];
}
exports.trimCollectionNameFromId = trimCollectionNameFromId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3V0aWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBdUM7QUFFdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBWTNCLEtBQUssVUFBVSxZQUFZLENBQUMsV0FBd0IsRUFBRSxVQUFrQjtJQUN0RSxNQUFNLFNBQVMsR0FBRyxDQUFDLFdBQXdCLEVBQUUsS0FBNkIsRUFBRSxFQUFFO1FBQzVFLE1BQU0sUUFBUSxHQUFnQixFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFDakQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hGLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxELEtBQUssTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFO1lBQzFCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7Z0JBQUUsU0FBUztZQUMxQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDLENBQUM7SUFDRixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDMUMsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUU1QyxJQUFJLElBQUk7UUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25DLElBQUksS0FBSztRQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckMsSUFBSSxJQUFJO1FBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5QixTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTlCLE9BQU8sTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQVVRLG9DQUFZO0FBUnJCLFNBQVMscUJBQXFCLENBQUMsY0FBc0IsRUFBRSxFQUFVO0lBQy9ELE9BQU8sR0FBRyxjQUFjLElBQUksRUFBRSxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQU1zQixzREFBcUI7QUFKNUMsU0FBUyx3QkFBd0IsQ0FBQyxFQUFVO0lBQzFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRTZDLDREQUF3QiJ9