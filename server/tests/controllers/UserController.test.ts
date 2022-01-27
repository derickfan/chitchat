import * as UserController from "../../controllers/UserController";
import db from "../../models/index";

describe("test UserController", () => {

    let testDB = db;

    beforeAll(async () => {
        await testDB.sync({ force: true });
    })

    afterAll(done => {
        testDB.close();
        done();
    })

    test("createUser returns the newly created user", async () => {
        const user = await UserController.createUser({
            email: "testuser@gmail.com",
            password: "testuser",
            username: "testuser",
        });

        expect(user.email).toEqual("testuser@gmail.com");
        expect(user.username).toEqual("testuser");
        expect(user.hashedPassword.length).toEqual(60);
        expect(user.id.length).toEqual(36);
    });

    test("getAllUsers returns an array of 1 User", async () => {
        const users = await UserController.getAllUsers();
        expect(users.length).toEqual(1);
    });

    test("getAllOtherUsers returns all the other users", async () => {
        const user = await UserController.createUser({
            email: "testuser1@gmail.com",
            password: "testuser1",
            username: "testuser1",
        });

        const users = await UserController.getAllOtherUsers(user.id);
        expect(users.length).toEqual(1);
    });

    test("getUser returns the user", async () => {
        const user = await UserController.getUser("testuser");
        expect(user.username).toEqual("testuser");
    });

    test("updateUser updates the username", async () => {
        const user = await UserController.getUser("testuser");
        
        const updatedUser = await UserController.updateUser("testuser", "username", "updatedUsername");
        expect(updatedUser.username).toEqual("updatedUsername");
    });

    test("deleteUser successfully deletes the user", async () => {
        await UserController.deleteUser("testuser1", "testuser1");
        const users = await UserController.getAllUsers();
        expect(users.length).toEqual(1);
    });
})
