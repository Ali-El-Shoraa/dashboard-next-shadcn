import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const popularContent = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Comprehensive course to learn React from scratch.",
    image:
      "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 499,
    category: "Web Development",
    badge: "Completed",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Learn UI design using Figma with practical projects.",
    image:
      "https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 299,
    category: "Design",
    badge: "Completed",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Complete Flutter course for building cross-platform apps.",
    image:
      "https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 599,
    category: "Mobile Development",
    badge: "Completed",
  },
];

const latestTransactions = [
  {
    id: 1,
    title: "React Book Purchase",
    badge: "Completed",
    image:
      "https://images.pexels.com/photos/32221080/pexels-photo-32221080/free-photo-of-cozy-breakfast-scene-with-latte-and-croissant.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 1200,
  },
  {
    id: 2,
    title: "Monthly Subscription",
    badge: "Processing",
    image:
      "https://images.pexels.com/photos/1684151/pexels-photo-1684151.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 2990,
  },
  {
    id: 3,
    title: "Website Development",
    badge: "Cancelled",
    image:
      "https://images.pexels.com/photos/8534381/pexels-photo-8534381.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 4500,
  },
  {
    id: 4,
    title: "UI Design Package",
    badge: "Completed",
    image:
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 2990,
  },
  {
    id: 5,
    title: "Cloud Hosting Renewal",
    badge: "Pending",
    image:
      "https://images.pexels.com/photos/3913016/pexels-photo-3913016.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: 8990,
  },
];

export default function CardList({ title }: { title: string }) {
  const list =
    title === "Popular Content" ? popularContent : latestTransactions;
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">{title}</h1>

      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Card
            key={item.id}
            className="flex-row items-center justify-between gap-4 p-4"
          >
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <CardContent className="flex-1 p-0">
              <CardTitle className="font-medium text-sm">
                {item.title}
              </CardTitle>
              <Badge variant="secondary">{item.badge}</Badge>
            </CardContent>

            <CardFooter className="p-0">{item.count / 1000}K</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
