"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Plus,
  Lock,
  Unlock,
  Edit,
  Trash2,
  RefreshCw,
  BarChart2,
  Filter,
  Star,
  Printer,
  Mail,
  Phone,
  Globe,
  Cake,
  MapPin,
  User as UserIcon,
  Smile,
  Image as ImageIcon,
  //   Search,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  gender: "male" | "female";
  birthday: string;
  personality: string;
  city: string;
  website: string;
  interest: string;
  status: "active" | "blocked";
  category: "personal" | "organization";
  notes?: string;
  address?: string;
  company?: string;
  jobTitle?: string;
};

type UnsplashPhoto = {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  user: {
    name: string;
  };
};

export default function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<"personal" | "organization">(
    "personal"
  );
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showNewContactSheet, setShowNewContactSheet] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    category: "personal",
    status: "active",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  });
  const [
    ,
    // unsplashPhotos
    setUnsplashPhotos,
  ] = useState<UnsplashPhoto[]>([]);
  const [
    imageSearchTerm,
    // setImageSearchTerm
  ] = useState("portrait");

  // Load sample data
  useEffect(() => {
    const sampleContacts: Contact[] = [
      {
        id: "1",
        firstName: "Bucky",
        lastName: "Barnes",
        email: "barnes@gmail.com",
        phone: "+0 1800 76855",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
        gender: "male",
        birthday: "18 May 1994",
        personality: "Cool",
        city: "Moline Acres",
        website: "www.pixelstrap.com",
        interest: "Photography",
        status: "active",
        category: "personal",
        notes: "Prefers email communication",
        address: "123 Main St, Moline Acres, MO 63137",
      },
      {
        id: "2",
        firstName: "Comeren",
        lastName: "Diaz",
        email: "comeren@gmail.com",
        phone: "+0 1800 55812",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
        gender: "female",
        birthday: "7 Feb 1995",
        personality: "Cool",
        city: "Delhi",
        website: "www.cometest.com",
        interest: "Sports",
        status: "active",
        category: "personal",
        company: "Sports Inc",
        jobTitle: "Marketing Manager",
      },
      {
        id: "3",
        firstName: "Issa",
        lastName: "Bell",
        email: "issabell@gmail.com",
        phone: "+0 1800 87412",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
        gender: "male",
        birthday: "20 Jul 1993",
        personality: "Cool",
        city: "Mumbai",
        website: "www.belltest.com",
        interest: "Cooking",
        status: "blocked",
        category: "organization",
        notes: "Contact only during business hours",
      },
    ];
    setContacts(sampleContacts);
  }, []);

  // Fetch Unsplash photos
  useEffect(() => {
    const fetchUnsplashPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${imageSearchTerm}&per_page=12&client_id=YOUR_UNSPLASH_ACCESS_KEY`
        );
        const data = await response.json();
        setUnsplashPhotos(data.results);
      } catch (error) {
        console.error("Error fetching Unsplash photos:", error);
      }
    };

    if (showImagePicker) {
      fetchUnsplashPhotos();
    }
  }, [showImagePicker, imageSearchTerm]);

  const filteredContacts = contacts.filter((contact) => {
    if (contact.category !== activeTab) return false;
    if (
      searchQuery &&
      !contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Contacts refreshed successfully");
    }, 1000);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
    toast.success("Contact deleted successfully");
  };

  const handleToggleStatus = (id: string) => {
    setContacts(
      contacts?.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              status: contact.status === "active" ? "blocked" : "active",
            }
          : contact
      )
    );
    if (selectedContact?.id === id) {
      setSelectedContact({
        ...selectedContact,
        status: selectedContact.status === "active" ? "blocked" : "active",
      });
    }
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const handleEditContact = () => {
    if (!selectedContact) return;
    setShowEditSheet(true);
  };

  const handleSaveContact = () => {
    if (!selectedContact) return;

    setContacts(
      contacts?.map((contact) =>
        contact.id === selectedContact.id ? selectedContact : contact
      )
    );

    setShowEditSheet(false);
    toast.success("Contact updated successfully");
  };

  const handleAddContact = () => {
    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      toast.error("Please fill in required fields");
      return;
    }

    const contactToAdd: Contact = {
      id: Math.random().toString(36).substring(2, 9),
      firstName: newContact.firstName || "",
      lastName: newContact.lastName || "",
      email: newContact.email || "",
      phone: newContact.phone || "",
      avatar:
        newContact.avatar ||
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      gender: newContact.gender || "male",
      birthday: newContact.birthday || "",
      personality: newContact.personality || "",
      city: newContact.city || "",
      website: newContact.website || "",
      interest: newContact.interest || "",
      status: newContact.status || "active",
      category: newContact.category || "personal",
      notes: newContact.notes,
      address: newContact.address,
      company: newContact.company,
      jobTitle: newContact.jobTitle,
    };

    setContacts([...contacts, contactToAdd]);
    setSelectedContact(contactToAdd);
    setShowNewContactSheet(false);
    setNewContact({
      category: "personal",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    });
    toast.success("Contact added successfully");
  };

  //   const handleImageSelect = (url: string) => {
  //     if (showEditSheet && selectedContact) {
  //       setSelectedContact({
  //         ...selectedContact,
  //         avatar: url,
  //       });
  //     } else {
  //       setNewContact({
  //         ...newContact,
  //         avatar: url,
  //       });
  //     }
  //     setShowImagePicker(false);
  //   };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <Card className="h-full">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces"
                alt="User"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h6 className="font-semibold">WILLIAM C. JENNINGS</h6>
                <p className="text-sm text-muted-foreground">
                  william@jourrapide.com
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full"
                variant="default"
                onClick={() => setShowNewContactSheet(true)}
              >
                <Users className="w-4 h-4 mr-2" />
                New Contacts
              </Button>

              <Button className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Filter className="w-4 h-4" />
                  <span>Filter By</span>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "personal" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("personal")}
                  >
                    Personal
                  </Button>
                  <Button
                    variant={activeTab === "organization" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("organization")}
                  >
                    Organization
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Follow up
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Favorites
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Ideas
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Important
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Business
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Holidays
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="capitalize">{activeTab}</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredContacts.length} Contacts
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw
                    className={cn("w-4 h-4", isRefreshing && "animate-spin")}
                  />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Contact List */}
              <div className="w-full md:w-1/3 border-r p-4">
                <div className="relative mb-4">
                  <Input
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>

                <div className="space-y-2 overflow-y-auto">
                  {filteredContacts.length > 0 ? (
                    filteredContacts?.map((contact) => (
                      <div
                        key={contact.id}
                        className={cn(
                          "p-3 rounded-lg cursor-pointer transition-colors",
                          selectedContact?.id === contact.id
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-muted/50"
                        )}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={contact.avatar}
                            alt={contact.firstName}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <h6 className="font-medium">
                              {contact.firstName} {contact.lastName}
                            </h6>
                            <p className="text-sm text-muted-foreground">
                              {contact.email}
                            </p>
                          </div>
                          <Badge
                            variant={
                              contact.status === "active"
                                ? "default"
                                : "destructive"
                            }
                            className="capitalize"
                          >
                            {contact.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No contacts found
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="w-full md:w-2/3 p-6 max-h-[calc(100vh-180px)] overflow-y-auto">
                {selectedContact ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="relative group">
                        <Image
                          src={selectedContact.avatar}
                          alt={selectedContact.firstName}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        {/* <div
                          className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                          onClick={() => setShowImagePicker(true)}
                        >
                          <Edit className="w-5 h-5 text-white" />
                        </div> */}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold">
                          {selectedContact.firstName} {selectedContact.lastName}
                          {selectedContact.company && (
                            <span className="block text-sm text-muted-foreground mt-1">
                              {selectedContact.jobTitle} at{" "}
                              {selectedContact.company}
                            </span>
                          )}
                        </h4>
                        <p className="text-muted-foreground">
                          {selectedContact.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditContact}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(selectedContact.id)}
                      >
                        {selectedContact.status === "active" ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Block
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4 mr-2" />
                            Unblock
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteContact(selectedContact.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowHistory(true)}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        History
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                      </Button>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h5 className="flex items-center gap-2 font-medium">
                          <BarChart2 className="w-4 h-4" />
                          General Information
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <UserIcon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Name
                              </p>
                              <p className="font-medium">
                                {selectedContact.firstName}{" "}
                                {selectedContact.lastName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Smile className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Gender
                              </p>
                              <p className="font-medium capitalize">
                                {selectedContact.gender}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Cake className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Birthday
                              </p>
                              <p className="font-medium">
                                {selectedContact.birthday}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Smile className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Personality
                              </p>
                              <p className="font-medium">
                                {selectedContact.personality}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                City
                              </p>
                              <p className="font-medium">
                                {selectedContact.city}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Mobile No
                              </p>
                              <p className="font-medium">
                                {selectedContact.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Email Address
                              </p>
                              <p className="font-medium">
                                {selectedContact.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Globe className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Website
                              </p>
                              <p className="font-medium">
                                {selectedContact.website}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedContact.address && (
                        <div className="space-y-2">
                          <h5 className="flex items-center gap-2 font-medium">
                            <MapPin className="w-4 h-4" />
                            Address
                          </h5>
                          <p className="text-muted-foreground">
                            {selectedContact.address}
                          </p>
                        </div>
                      )}

                      {selectedContact.notes && (
                        <div className="space-y-2">
                          <h5 className="flex items-center gap-2 font-medium">
                            <Edit className="w-4 h-4" />
                            Notes
                          </h5>
                          <p className="text-muted-foreground">
                            {selectedContact.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-2">
                    <Users className="w-10 h-10" />
                    <p>Select a contact to view details</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowNewContactSheet(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Contact
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Sheet */}
      <Sheet open={showHistory} onOpenChange={setShowHistory}>
        <SheetContent side="right" className="w-full sm:w-[400px]">
          <ScrollArea className="h-full">
            <SheetHeader>
              <SheetTitle>Contact History</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="text-center py-8">
                <Star className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p>Contact has not been modified yet.</p>
              </div>
              <div className="flex gap-3">
                <Star className="w-5 h-5 mt-0.5 text-yellow-500" />
                <div>
                  <h6 className="font-medium">Contact Created</h6>
                  <p className="text-sm text-muted-foreground">
                    Contact is created via mail
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sep 10, 2025 4:00
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Edit Contact Sheet */}
      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent side="right" className="w-full sm:w-[500px]">
          <ScrollArea className="h-full">
            <SheetHeader>
              <SheetTitle>Edit Contact</SheetTitle>
            </SheetHeader>
            {selectedContact && (
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={selectedContact.avatar}
                      alt={selectedContact.firstName}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={() => setShowImagePicker(true)}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Profile Image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Click the camera icon to change
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      First Name
                    </label>
                    <Input
                      value={selectedContact.firstName}
                      onChange={(e) =>
                        setSelectedContact({
                          ...selectedContact,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Last Name
                    </label>
                    <Input
                      value={selectedContact.lastName}
                      onChange={(e) =>
                        setSelectedContact({
                          ...selectedContact,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input
                    value={selectedContact.email}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <Input
                    value={selectedContact.phone}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Gender
                  </label>
                  <Select
                    value={selectedContact.gender}
                    onValueChange={(value) =>
                      setSelectedContact({
                        ...selectedContact,
                        gender: value as "male" | "female",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Category
                  </label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant={
                        selectedContact.category === "personal"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setSelectedContact({
                          ...selectedContact,
                          category: "personal",
                        })
                      }
                    >
                      Personal
                    </Button>
                    <Button
                      variant={
                        selectedContact.category === "organization"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setSelectedContact({
                          ...selectedContact,
                          category: "organization",
                        })
                      }
                    >
                      Organization
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Company
                    </label>
                    <Input
                      value={selectedContact.company || ""}
                      onChange={(e) =>
                        setSelectedContact({
                          ...selectedContact,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Job Title
                    </label>
                    <Input
                      value={selectedContact.jobTitle || ""}
                      onChange={(e) =>
                        setSelectedContact({
                          ...selectedContact,
                          jobTitle: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Notes</label>
                  <Input
                    value={selectedContact.notes || ""}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

                <SheetFooter className="p-0">
                  <Button
                    variant="outline"
                    onClick={() => setShowEditSheet(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveContact}>Save Changes</Button>
                </SheetFooter>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* New Contact Sheet */}
      <Sheet open={showNewContactSheet} onOpenChange={setShowNewContactSheet}>
        <SheetContent side="right" className="w-full sm:w-[500px]">
          <ScrollArea className="h-full">
            <SheetHeader>
              <SheetTitle>Add New Contact</SheetTitle>
            </SheetHeader>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
                    }
                    alt="New contact"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    onClick={() => setShowImagePicker(true)}
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Profile Image</p>
                  <p className="text-xs text-muted-foreground">
                    Click the camera icon to change
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    First Name*
                  </label>
                  <Input
                    value={newContact.firstName || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Last Name*
                  </label>
                  <Input
                    value={newContact.lastName || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Email*</label>
                <Input
                  value={newContact.email || ""}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Phone</label>
                <Input
                  value={newContact.phone || ""}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Gender</label>
                <Select
                  value={newContact.gender || "male"}
                  onValueChange={(value) =>
                    setNewContact({
                      ...newContact,
                      gender: value as "male" | "female",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Category
                </label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={
                      newContact.category === "personal" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setNewContact({
                        ...newContact,
                        category: "personal",
                      })
                    }
                  >
                    Personal
                  </Button>
                  <Button
                    variant={
                      newContact.category === "organization"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setNewContact({
                        ...newContact,
                        category: "organization",
                      })
                    }
                  >
                    Organization
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Company
                  </label>
                  <Input
                    value={newContact.company || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Job Title
                  </label>
                  <Input
                    value={newContact.jobTitle || ""}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        jobTitle: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Notes</label>
                <Input
                  value={newContact.notes || ""}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      notes: e.target.value,
                    })
                  }
                />
              </div>

              <SheetFooter className="p-0">
                <Button
                  variant="outline"
                  onClick={() => setShowNewContactSheet(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddContact}>Add Contact</Button>
              </SheetFooter>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Image Picker Dialog */}
      {/* <Dialog open={showImagePicker} onOpenChange={setShowImagePicker}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select Profile Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search for images..."
                value={imageSearchTerm}
                onChange={(e) => setImageSearchTerm(e.target.value)}
                className="pl-8"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
              {unsplashPhotos?.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square cursor-pointer group"
                  onClick={() => handleImageSelect(photo.urls.regular)}
                >
                  <Image
                    src={photo.urls.thumb}
                    alt={photo.user.name}
                    fill
                    className="rounded-md object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="default" size="sm">
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* Print Modal */}
      {showPrintModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Print Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="print-content" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedContact.avatar}
                    alt={selectedContact.firstName}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h5 className="font-semibold">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </h5>
                    <p className="text-muted-foreground">
                      {selectedContact.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h6 className="font-medium">General</h6>
                  <p>
                    Email Address:{" "}
                    <span className="text-primary">
                      {selectedContact.email}
                    </span>
                  </p>
                  <p>
                    Phone:{" "}
                    <span className="text-primary">
                      {selectedContact.phone}
                    </span>
                  </p>
                  {selectedContact.company && (
                    <p>
                      Company:{" "}
                      <span className="text-primary">
                        {selectedContact.company}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <div className="p-4 border-t flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPrintModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const printContent = document.getElementById("print-content");
                  if (printContent) {
                    const printWindow = window.open("", "_blank");
                    printWindow?.document.write(`
                      <html>
                        <head>
                          <title>Print Contact</title>
                          <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            img { max-width: 100px; height: auto; }
                            h5 { font-size: 18px; margin: 0; }
                            p { margin: 5px 0; }
                            h6 { font-size: 16px; margin: 10px 0 5px; }
                          </style>
                        </head>
                        <body>
                          ${printContent.innerHTML}
                        </body>
                      </html>
                    `);
                    printWindow?.document.close();
                    printWindow?.focus();
                    setTimeout(() => {
                      printWindow?.print();
                    }, 200);
                  }
                  setShowPrintModal(false);
                }}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
