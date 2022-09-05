query {
  dealers(filters: { models: { Name: { containsi: "3080" } } }) {
    data {
      attributes {
        CompanyName
        CompanyDesc
        models {
          data {
            attributes {
              Name
            }
          }
        }
      }
    }
  }
}