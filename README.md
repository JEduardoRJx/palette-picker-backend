# Tone Zone Backend 
Tone Zone API is a RESTful API. The following is documentation for Version (v1) released December 2019. This API came out of a project to get comfortable building a backend and connecting/using it with a front end project. Tech used for the backend:
  * Express
  * Knex
  * PostgreSQL
  * and writing professional-grade documentation.

## Front-End
[To our font-end repo for Tone Zone](https://github.com/JEduardoRJx/palette-picker-frontend)

## Contributors
- [J. Eduardo Rodriguez](https://github.com/JEduardoRJx)
- [Lacy Rudd](https://github.com/dawnlunacy)

## Response Format
 Response format is in `JSON`
 
 ## All Routes
 All Routes stem from:
 [Tone Zone](https://tone-zone-api.herokuapp.com/)
`https://tone-zone-api.herokuapp.com/`

## GET All Projects For A User
`GET /api/v1/:user_id/projects`
<details>
Will return all Projects for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `id`          | *integer*     | Projects id, ex: `3`|
| `project_name`| *string*      | Name of a project:, ex: `Spring` |
| `user_id`     | *integer*     | Project link to which user, ex: `1` |
| `created_at`  | *string*      | When info. was created  |
| `updated_at`  | *string*      | When info. was last updated |

### Sample Response
```javascript
    [
      {
        id: 1,
        project_name: "fall",
        user_id: 1,
        created_at: "2019-12-10T04:14:29.612Z",
        updated_at: "2019-12-10T04:14:29.612Z"
      },
      {
        id: 2,
        project_name: "winter",
        user_id: 1,
        created_at: "2019-12-10T04:14:29.623Z",
        updated_at: "2019-12-10T04:14:29.623Z"
      },
      {
        id: 3,
        project_name: "spring",
        user_id: 1,
        created_at: "2019-12-10T04:14:29.628Z",
        updated_at: "2019-12-10T04:14:29.628Z"
      },
      {
        id: 4,
        project_name: "summer",
        user_id: 1,
        created_at: "2019-12-10T04:14:29.636Z",
        updated_at: "2019-12-10T04:14:29.636Z"
      }
    ]
```
</details>

## GET A Specific Project For A User
`GET /api/v1/:user_id/projects/:id`
<details>
Will return a specific project for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `id`          | *integer*     | Projects id, ex: `3`|
| `project_name`| *string*      | Name of a project:, ex: `Spring` |
| `user_id`     | *integer*     | Project link to which user, ex: `1` |
| `created_at`  | *string*      | When info. was created  |
| `updated_at`  | *string*      | When info. was last updated |

### Sample Response
```javascript
    [
      {
        id: 3,
        project_name: "spring",
        user_id: 1,
        created_at: "2019-12-10T04:14:29.628Z",
        updated_at: "2019-12-10T04:14:29.628Z"
      }
    ]
```
</details>

## GET All Palletes For A User
`GET /api/v1/:user_id/projects/:project_id/palettes`
<details>
Will return all Palettes for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `id`          | *integer*     | Palettes id, ex: `3`|
| `palette_name`| *string*      | Name of a palette:, ex: `Spring Colors` |
| `project_id`  | *integer*     | Which project this palette belongs too, ex: `3` |
| `color1`      | *string*      | First color, ex: `#CECCCC` |
| `color2`      | *string*      | First color, ex: `#9D6381` |
| `color3`      | *string*      | First color, ex: `#FDECEF` |
| `color4`      | *string*      | First color, ex: `#0F110C` |
| `color5`      | *string*      | First color, ex: `612940` |
| `created_at`  | *string*      | When info. was created  |
| `updated_at`  | *string*      | When info. was last updated |

### Sample Response
```javascript
[
  {
    id: 3,
    palette_name: "spring colors",
    project_id: 3,
    color1: "#CECCCC",
    color2: "#9D6381",
    color3: "#FDECEF",
    color4: "#0F110C",
    color5: "#612940",
    created_at: "2019-12-10T04:14:29.641Z",
    updated_at: "2019-12-10T04:14:29.641Z"
  }
]
```
</details>

## GET A Specific Palette For A User
`GET /api/v1/:user_id/projects/:project_id/palettes/:id`
<details>
Will return all Palettes for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `id`          | *integer*     | Palettes id, ex: `3`|
| `palette_name`| *string*      | Name of a palette:, ex: `Spring Colors` |
| `project_id`  | *integer*     | Which project this palette belongs too, ex: `3` |
| `color1`      | *string*      | First color, ex: `#CECCCC` |
| `color2`      | *string*      | First color, ex: `#9D6381` |
| `color3`      | *string*      | First color, ex: `#FDECEF` |
| `color4`      | *string*      | First color, ex: `#0F110C` |
| `color5`      | *string*      | First color, ex: `612940` |
| `created_at`  | *string*      | When info. was created  |
| `updated_at`  | *string*      | When info. was last updated |

### Sample Response
```javascript
[
  {
    id: 3,
    palette_name: "spring colors",
    project_id: 3,
    color1: "#CECCCC",
    color2: "#9D6381",
    color3: "#FDECEF",
    color4: "#0F110C",
    color5: "#612940",
    created_at: "2019-12-10T04:14:29.641Z",
    updated_at: "2019-12-10T04:14:29.641Z"
  }
]
```
</details>

## POST A New Project For A User
`POST /api/v1/:user_id/projects`
<details>
Will POST a new project for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `project_name`| *string*      | **required** Name of the new project:, ex: `Warm Colors` |
| `user_id`     | *integer*     | **required** Which user this project will belong too, ex: `1` |

### Sample POST Request
```javascript
  {
    "palette_name": "Warm Colors",
    "project_id": 1
  }
```
### Sample POST Response
```javascript
{
    "id": 5,
    "message": "Project Warm Colors has been created with an id of 5"
}
```
</details>

## POST A New Palette Under A Project For A User
`POST /api/v1/:user_id/projects/:project_id/palettes`
<details>
Will POST a new palette under a project for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `palette_name`| *string*      | **required** Name of the new palette:, ex: `Cool Colors` |
| `project_id`  | *integer*     | **required** Which project this palette will belong too, ex: `2` |
| `color1`      | *string*      | **required** First color, ex: `#CECCCC` |
| `color2`      | *string*      | **required** First color, ex: `#9D6381` |
| `color3`      | *string*      | **required** First color, ex: `#FDECEF` |
| `color4`      | *string*      | **required** First color, ex: `#0F110C` |
| `color5`      | *string*      | **required** First color, ex: `#612940` |
| `created_at`  | *string*      | **required** When info. was created  |
| `updated_at`  | *string*      | **required** When info. was last updated |

### Sample POST Request
```javascript
{
	"palette_name": "Cool Colors",
	"project_id": 2,
	"color1": "#CECCCC",
	"color2": "#9D6381",
	"color3": "#FDECEF",
	"color4": "#0F110C",
	"color5": "#612940"
 }
```
### Sample POST Response
```javascript
{
    "id": 5,
    "message": "Palette Cool Colors has been created with an id of 5"
}
```
</details>

## DELETE A Project For A User
`DELETE /api/v1/:user_id/projects/:project_id`
<details>
Will POST a new palette under a project for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `user_id     `| *integer*      | **required** Which user a project is attributed to:, ex: `2` 
| `project_id`  | *integer*     | **required** Which project you want to delete, ex: `2` |

### Sample DELETE Request
```javascript
{
	"user_id": 1
	"project_id": 2,
 }
```
</details>

## DELETE A Palette For A User
`DELETE /api/v1/:user_id/projects/:project_id/palettes/:palette_id`
<details>
Will POST a new palette under a project for a default user.

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `project_id`  | *integer*     | **required** Which project a palette is attributed to:, ex: `2` 
| `palette_id`  | *integer*     | **required** Which palette you want to delete, ex: `2` |

### Sample DELETE Request
```javascript
{
	"project_id": 2,
	"palette_id": 1
 }
```
</details>

## PATCH Update A Projects Name For A User
`PATCH /api/v1/:user_id/projects/:project_id`
<details>
Will update a current projects name

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `user_id`     | *integer*     | **required** Which user a project is attributed to:, ex: `1`|
| `project_id`  | *integer*     | **required** Which project to update:, ex: `1` |
| `project_name`| *string*      | **required** New Projects name, ex: `Neon` |

### Sample PATCH Request
```javascript
{
	"user_id": 1,
	"project_id": 1,
	"project_name": "Neon"
 }
```

### Sample PATCH Response
```javascript
"Updated to Neon"
```
</details>

## PATCH Update A Palettes Name For A User
`PATCH /api/v1/:user_id/projects/:project_id/palettes/:id`
<details>
Will update a current palettes name

| **Param**     | **Value**     | **Description**  |
| ------------- |:-------------:| ----------------|
| `user_id`     | *integer*     | **required** Which user a project is attributed to:, ex: `1`|
| `project_id`  | *integer*     | **required** Which project a palette is attributed to:, ex: `1` |
| `id`          | *integer*     | **required** Which palette to update:, ex: `1` |
| `palette_name`| *string*      | **required** New palettes name, ex: `Neon` |

### Sample PATCH Request
```javascript
{
	"user_id": 1,
	"project_id": 1,
	"id": 1,
	"palette_name": "Bright Neon"
 }
```

### Sample PATCH Response
```javascript
"Palette's name updated to Bright Neon"
```
</details>
