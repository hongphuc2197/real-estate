import { EnquiryTopic } from "../../enums/enquiries.js";

const dummyContent1 =
  "<h3>Dear [Person],</h3><p>&nbsp;</p><p>I am writing this letter to enquire about <strong>[XXX]</strong>. Our company is in urgent need of a place for our new employees. We have a budget of $60,000 and we require [xxx] with a features that we need. We would be interested in buying <strong>[XXX]</strong>.</p><p>We would like to know the details of different [xxx] available under the specifications we are looking for. In case, the [xxx] that we are looking does not fit into our budget then we would be happy to consider other [xxx] available.</p><p>important features:</p><ol><li>item1</li><li>item2</li><li>item3</li><li>item4</li><li>item5</li></ol>";

export const enquiries = [
  {
    enquiry_id: "e01",
    content: dummyContent1,
    email: "test@email.com",
    title: "LAUNDRY - Gịặt ủi gia đình",
    topic: EnquiryTopic.info,
    read: false,
    property: {
      name: "WASH AND DRY LAUNDRY - Gịặt ủi gia đình",
      property_id: "106ab526-72af-4446-9550-998a48d98c0c",
    },
    users: {
      from: {
        user_id: "u04",
        keep: true,
      },
      to: {
        user_id: "u01",
        keep: true,
      },
    },
    createdAt: "2022-08-25T04:08:49.642Z",
    updatedAt: "2022-08-25T04:08:49.642Z",
  },
  {
    enquiry_id: "e02",
    content: dummyContent1,
    email: "test@email.com",
    title: "LAUNDRY Hành tinh xanh Sales",
    topic: EnquiryTopic.sales,
    read: false,
    property: {
      name: "WASH AND DRY LAUNDRY - Giặt ủi Ngôi sao nhỏ",
      property_id: "106ab526-72af-4446-9550-998a48d98c0c",
    },
    users: {
      from: {
        user_id: "u04",
        keep: true,
      },
      to: {
        user_id: "u01",
        keep: true,
      },
    },
    createdAt: "2022-08-25T04:08:49.642Z",
    updatedAt: "2022-08-25T04:08:49.642Z",
  },
  {
    enquiry_id: "e03",
    content: dummyContent1,
    email: "test@email.com",
    title: "3ha đất công nghiệp lâu năm",
    topic: EnquiryTopic.info,
    read: false,
    property: {
      name: "Đất trồng cây công nghiệp lâu năm Tây Nguyên",
      property_id: "b7973ec5-2931-4040-a846-a0271153718d",
    },
    users: {
      from: {
        user_id: "u01",
        keep: true,
      },
      to: {
        user_id: "u02",
        keep: true,
      },
    },
    createdAt: "2024-05-21T04:09:49.642Z",
    updatedAt: "2024-05-21T04:09:49.642Z",
  },
  {
    enquiry_id: "e04",
    content: dummyContent1,
    email: "test@email.com",
    title: "Photo Studio Dummy Schedule",
    topic: EnquiryTopic.schedule,
    read: false,
    property: {
      name: "Photo Studio - Dummy",
      property_id: "4b58df58-3e8d-453e-9802-7537a514453e",
    },
    users: {
      from: {
        user_id: "u01",
        keep: true,
      },
      to: {
        user_id: "u02",
        keep: true,
      },
    },
    createdAt: "2022-09-23T04:09:49.642Z",
    updatedAt: "2022-09-23T04:09:49.642Z",
  },
  {
    enquiry_id: "e05",
    content: dummyContent1,
    email: "test@email.com",
    title: "Facility Dummy Payment",
    topic: EnquiryTopic.payment,
    read: false,
    property: {
      name: "Storage Facility - Dummy",
      property_id: "fef95dc0-0131-46b4-aa63-09f19898a0c8",
    },
    users: {
      from: {
        user_id: "u01",
        keep: true,
      },
      to: {
        user_id: "u03",
        keep: true,
      },
    },
    createdAt: "2022-07-23T01:09:49.642Z",
    updatedAt: "2022-07-23T01:09:49.642Z",
  },
];
